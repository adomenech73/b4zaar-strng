FROM      ubuntu
MAINTAINER Albert Domenech <ado@uoc.edu>

# Set Environment
RUN locale-gen --no-purge es_ES.UTF-8
ENV LC_ALL es_ES.UTF-8
# Let the conatiner know that there is no tty
ENV DEBIAN_FRONTEND noninteractive

# Keep upstart from complaining
RUN dpkg-divert --local --rename --add /sbin/initctl && \
    ln -sf /bin/true /sbin/initctl && \
    # Install dependencies
    apt-get update && apt-get upgrade -y && apt-get install -y -q --no-install-recommends \
      git build-essential openssl libssl-dev pkg-config curl supervisor python-pip  &&\
    rm -rf /var/lib/apt/lists/* && \
    echo "supervisor-stdout" > base_reqs.txt && \
    pip install -r base_reqs.txt && \
    rm -rf ~/.pip/cache && \
    rm -rf build && \
    mkdir -p /var/log/supervisor

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord"]
