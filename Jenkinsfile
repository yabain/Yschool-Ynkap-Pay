pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker-hub-cred')
  }
  stages {
    stage('Build') {
      steps {
        sh 'docker build -t yabain/yschool-apipayment-backend .'
      }
    }
    stage('Login') {
      steps {
        sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
      }
    }
    stage('Push') {
      steps {
        sh 'docker push yabain/yschool-apipayment-backend'
      }
      
    }
  }
  post {
    always {
      sh 'docker logout'
    }
  }
}
