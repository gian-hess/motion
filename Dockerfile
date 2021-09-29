FROM continuumio/miniconda3:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update && apt-get upgrade -y

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs && apt-get install -y npm

RUN mkdir -p /backend
RUN mkdir -p /frontend
RUN mkdir -p /frontend_tmp
RUN mkdir -p /scripts
RUN mkdir -p /static-files
RUN mkdir -p /media-files


COPY ./backend /backend

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/motion/bin:$PATH
RUN echo "source activate motion" >~/.bashrc

COPY ./scripts /scripts
RUN chmod +x /scripts*

WORKDIR /backend

WORKDIR /frontend_tmp
COPY ./frontend/package.json /frontend_tmp/
RUN npm install
COPY ./frontend /frontend_tmp
RUN npm run build

WORKDIR /backend
