FROM adomenech73/baseuoc
MAINTAINER Albert Domenech <ado@uoc.edu>

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 0.10.38

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# copy supervisor conf 
ADD supervisor/nodejs.conf /etc/supervisor/conf.d/nodejs.conf
# start supervisor
CMD ["/usr/bin/supervisord"]

EXPOSE 3000
