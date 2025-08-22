pipeline {
    agent any

    environment {
        DOCKER_USER = 'suhail4545'
        DOCKER_PASS = 'Suhail@5555'
        REPO = 'https://github.com/suhail-12-10/project.git'
        EC2_USER = 'ubuntu'
        EC2_HOST = '13.50.112.168'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${env.REPO}"
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t ${DOCKER_USER}/backend:latest ./backend
                docker build -t ${DOCKER_USER}/frontend:latest ./frontend
                '''
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh '''
                echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin
                docker push ${DOCKER_USER}/backend:latest
                docker push ${DOCKER_USER}/frontend:latest
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
                        docker pull ${DOCKER_USER}/backend:latest &&
                        docker pull ${DOCKER_USER}/frontend:latest &&
                        docker stop backend || true &&
                        docker rm backend || true &&
                        docker stop frontend || true &&
                        docker rm frontend || true &&
                        docker run -d --name backend -p 5000:5000 ${DOCKER_USER}/backend:latest &&
                        docker run -d --name frontend -p 80:80 ${DOCKER_USER}/frontend:latest
                    "
                    '''
                }
            }
        }
    }
}
