FROM gitpod/workspace-full

# Install custom tools, runtime, etc. using apt-get
# More information: https://www.gitpod.io/docs/42_config_docker/
USER root
RUN sudo apt-get install \
	git \
	rsync \
    tmux \
	vim-common
                    
USER gitpod

## Import dotfiles
RUN git clone --depth 1 git@github.com:machuu/dotfiles.git ~/dotfiles
RUN ~/dotfiles/dotfiles install default

