FROM node:14-slim as builder

ARG USER
ARG PASSWORD
ARG CONFIG_FILE

WORKDIR /usr/src/app
COPY package.json .

# Install dependencies
RUN npm install

COPY . .

# Generate env.ts file and url.ts file
RUN  echo "export default {" > ./src/config/env.ts \
  && echo "  username: '${USER}',"  >> ./src/config/env.ts \
  && echo "  password: '${PASSWORD}'," >> ./src/config/env.ts \
  && echo "};" >> ./src/config/env.ts
RUN cp /usr/src/app/modules_configs/url_${CONFIG_FILE}.txt /usr/src/app/src/config/url.ts

# Build dist
RUN npm run build

FROM node:14-slim as exec

WORKDIR /usr/src/app

# Install chrome to headless run
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create user
RUN groupadd -r user \
    && useradd -r -g user user \
    && mkdir -p /home/user \
    && chown -R user:user /home/user

# Copy data from builder
COPY --chown=user:user --from=builder /usr/src/app/ /usr/src/app/

USER user:user

CMD ["node","dist/index.js"]
