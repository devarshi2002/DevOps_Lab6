pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('devarshi2002') // Jenkins secret ID
        USER_SERVICE_IMAGE = "devarshi2002/user-service"
        ORDER_SERVICE_IMAGE = "devarshi2002/order-service"
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
                        // Windows batch uses %VAR% for env vars
                        bat 'docker build -t %USER_SERVICE_IMAGE% .'
                    }
                    dir('microservices/order-service') {
                        bat 'docker build -t %ORDER_SERVICE_IMAGE% .'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Docker login with credentials using bat commands on Windows
                    bat """
                        echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                        docker push %USER_SERVICE_IMAGE%
                        docker push %ORDER_SERVICE_IMAGE%
                    """
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                script {
                    bat "docker run -d -p 3001:3001 --name user-service %USER_SERVICE_IMAGE%"
                    bat "docker run -d -p 3002:3002 --name order-service %ORDER_SERVICE_IMAGE%"
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
