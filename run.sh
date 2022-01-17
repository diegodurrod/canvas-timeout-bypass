#!/bin/bash
CONFIGS_INPUT_DIR=${PWD}/modules_configs
CONFIGS_OUTPUT_PATH=${PWD}/src/config/url.ts
SCRIPT_NAME='GENERATE_TIME_LOGS'
MAX_CONFIG_FILES=$(ls ${CONFIGS_INPUT_DIR}/*.txt -1 | wc -l | sed 's/ //g')
USER=$1
PASSWORD=$2

function LOG_INFO {
    echo "INFO [${SCRIPT_NAME}] [$(date +"%Y%m%d%H%M%S")] - $1"
}

function IMAGE_BUILD {
    docker build \
        --build-arg USER=${USER} \
        --build-arg PASSWORD=${PASSWORD} \
        --build-arg CONFIG_FILE=${CONFIG_FILE} \
        . -t generate_time_log_url_${CONFIG_FILE}
}

function CONTAINER_RUN {
    docker run -d \
        --name generate_time_log_url_${CONFIG_FILE} \
        generate_time_log_url_${CONFIG_FILE}
}

function CONTAINER_STOP {
    docker container stop generate_time_log_url_${CONFIG_FILE}
}

LOG_INFO "Process start."
LOG_INFO "Press [CTRL+C] to stop... Containers keep running, so stop it."
LOG_INFO "There are ${MAX_CONFIG_FILES} URL config files found."

while true
do
    CONFIG_FILE=$(seq 1 ${MAX_CONFIG_FILES} | sort -R | head -n 1)
    SLEEP_TIME=$(seq 3000 5280 | sort -R | head -n 1)
    LOG_INFO "Module selected: ${CONFIGS_INPUT_DIR}/url_${CONFIG_FILE}"
    LOG_INFO "Container timeout: ${SLEEP_TIME} seconds."
    IMAGE_BUILD
    CONTAINER_RUN
    LOG_INFO "To see docker logs; docker logs -f generate_time_log_url_${CONFIG_FILE}"
    sleep ${SLEEP_TIME}
    CONTAINER_STOP
done
