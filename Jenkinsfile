pipeline
    agent any

stages {
  stage('Build') {
    steps {
      sh 'npm install'
    }
  }
  stages('Test') {
    steps {
      sh 'public' --watchAll=false'
      }
    }
  stages('Deploy') {
    steps {
      sh 'npm start'
    }
  }
 }
}

