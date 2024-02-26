FROM continuumio/miniconda3

RUN mkdir -p /backend
RUN mkdir -p /scripts
RUN mkdir -p /static-files
RUN mkdir -p /media-files
RUN mkdir -p /frontend

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

COPY ./backend/requirements.yml /backend/requirements.yml
COPY ./scripts /scripts
RUN chmod +x /scripts

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml
# Preventing the generation of PyCache that the GitLab Runner might not have the rights to remove on subsequent pull. test
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH /opt/conda/envs/dronet/bin:$PATH
RUN echo "source activate dronet">~/.bashrc

WORKDIR /frontend
COPY ./frontend/package.json /frontend
COPY ./frontend/package-lock.json /frontend
RUN npm install
COPY ./frontend /frontend
RUN npm run build

COPY ./backend /backend
WORKDIR /backend