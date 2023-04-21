pipeline
    agent any

stages {
  stage('Build') {
    steps {
      sh 'npm install'
      }
    }
  stages('Deploy') {
    steps {
      sh 'npm start'
    }
  }
