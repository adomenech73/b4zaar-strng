FROM adomenech73/baseuoc
MAINTAINER Albert Domenech <ado@uoc.edu>

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' \
    | sudo tee /etc/apt/sources.list.d/mongodb.list && \
    apt-get update && apt-get upgrade -y && \
    apt-get install -y -q --no-install-recommends mongodb-org


# Open to connections other than localhost
RUN sed -e '/bind_ip/ s/^#*/#/' -i /etc/mongod.conf
# copy supervisor conf
ADD supervisor/mongodb.conf /etc/supervisor/conf.d/mongodb.conf
# start supervisor
CMD ["/usr/bin/supervisord"]

# Expose ports
EXPOSE 27017
