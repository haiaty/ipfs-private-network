FROM centos:centos7.9.2009

RUN yum install -y wget

#================
# GO - installation
#=================
RUN wget https://go.dev/dl/go1.18.2.linux-amd64.tar.gz

RUN tar -C /usr/local -xzf go1.18.2.linux-amd64.tar.gz

ENV PATH "$PATH:/usr/local/go/bin"

#================
# Certificates installation
#=================
# install certificates to install ipfs
RUN yum install -y ca-certificates

#================
# IPFS INSTALLATION
#=================
# Get IPFS
RUN wget https://dist.ipfs.io/go-ipfs/v0.12.2/go-ipfs_v0.12.2_linux-amd64.tar.gz

# extract bin from downloaded tar
RUN tar xvfz go-ipfs_v0.12.2_linux-amd64.tar.gz

# move to path
RUN mv go-ipfs/ipfs /usr/local/bin/ipfs

#=====================
# IPFS - peer initalizations
#========================
# note: we write the output to a file so we can take
# that information later

RUN touch peer_identity.txt
RUN IPFS_PATH=~/.ipfs ipfs init >> peer_identity.txt

#========================
# SWARM KEY GENERATION
#======================
# install git to get the repo for the key generation
RUN yum -y install git

#install the repo tha generate it
RUN go install github.com/Kubuxu/go-ipfs-swarm-key-gen/ipfs-swarm-key-gen@latest

# generate the swarm key
RUN cd ~ && go/bin/ipfs-swarm-key-gen > ~/.ipfs/swarm.key

#==================
# IPFS - remove nodes of public ipfs network
#================
#notw: we remove these nodes because we don't want to connect
# to the public network. Instead we want to connect to a private one
RUN IPFS_PATH=~/.ipfs ipfs bootstrap rm --all

#