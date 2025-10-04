pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('devarshi2002') // Jenkins secret ID
        IMAGE_NAME = "devarshi2002/devops-lab6"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/devarshi2002/DevOps_Lab6.git'
            }
        }

        stage('Build Combined Docker Image') {
            steps {
                script {
                    dir('combined') {
                        bat """
                            docker build -t %IMAGE_NAME%:user-service -t %IMAGE_NAME%:order-service .
                        """
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    bat """
                        echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                        docker push %IMAGE_NAME%:user-service
                        docker push %IMAGE_NAME%:order-service
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    bat "docker run -d -p 3001:3001 -p 3002:3002 --name combined-service %IMAGE_NAME%:user-service"
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
