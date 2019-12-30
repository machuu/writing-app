FROM gitpod/workspace-full
                    
USER gitpod

## Import dotfiles
RUN git clone --depth 1 git@github.com:machuu/dotfiles.git ~/dotfiles
RUN ~/dotfiles/setup.sh
WORKDIR ~/dotfiles
RUN bashdot install webdev


# Install custom tools, runtime, etc. using apt-get
# More information: https://www.gitpod.io/docs/42_config_docker/

RUN sudo apt-get install \
    tmux

