pipeline {
  agent any
  stages {
	stage('Sonarqube') {
    	environment {
        scannerHome = tool 'sonarqubescanner'
   	 }
    		steps {
        	withSonarQubeEnv('sonarqube') {
            	//sh "${scannerHome}/bin/sonar-scanner"
       		sh"sonar-scanner \
		  -Dsonar.projectKey=Devops0895_katana-skipper_AYcZMmRjSv-do65GrkXX \
 		  -Dsonar.sources=. \
  		  -Dsonar.host.url=http://3.144.186.115:9000 \
		  -Dsonar.login=squ_5acb85b044938d24b56d7b51633b7ce0cb5ce51b"

		}
        	timeout(time: 10, unit: 'MINUTES') {
            	waitForQualityGate abortPipeline: true
       		 }
   		}
	}
}
}
