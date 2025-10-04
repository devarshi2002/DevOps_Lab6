pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('devarshi2002') // Jenkins secret ID
        BASE_IMAGE = "devarshi2002/microservices"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/devarshi2002/DevOps_Lab6.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    dir('microservices/user-service') {
                        bat 'docker build -t %BASE_IMAGE%:user-service .'
                    }
                    dir('microservices/order-service') {
                        bat 'docker build -t %BASE_IMAGE%:order-service .'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    bat """
                        echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                        docker push %BASE_IMAGE%:user-service
                        docker push %BASE_IMAGE%:order-service
                    """
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    // Stop old containers if running
                    bat "docker rm -f user-service || exit 0"
                    bat "docker rm -f order-service || exit 0"

                    // Run new containers
                    bat "docker run -d -p 3001:3001 --name user-service %BASE_IMAGE%:user-service"
                    bat "docker run -d -p 3002:3002 --name order-service %BASE_IMAGE%:order-service"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
