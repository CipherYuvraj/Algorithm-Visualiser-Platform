FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    python3-dev \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install pybind11
RUN pip3 install pybind11[global]

# Set working directory
WORKDIR /workspace

# Copy source code
COPY . .

# Create build directory
RUN mkdir -p build

# Set default command
CMD ["bash"]
