FROM gitpod/workspace-full
                    
USER gitpod

## Import dotfiles
RUN git clone --depth 1 https://github.com/machuu/dotfiles.git ~/dotfiles
RUN ~/dotfiles/dotfiles install default

# Install custom tools, runtime, etc. using apt-get
# More information: https://www.gitpod.io/docs/42_config_docker/
USER root
RUN apt-get update && apt-get install -y \
    tmux

