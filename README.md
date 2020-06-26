# The-Incredible-Dreams

An interactive whiteboard which allows for pinning notes, changing background, choosing a random participant or splitting participants into groups(especially useful in a classroom or interactive content delivery setting).

## Summary

  - [Getting Started](#getting-started)
  - [Deployment](#deployment)
  - [Built With](#built-with)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Getting Started

The repository conatins an Angular project and a Spring Boot project in seperate folders, "classrrom-backend" for Spring Boot and "classroom-frontend" for Angular

### Prerequisites

Spring Boot project is developed in Java 11. So for that Java is a requirement. Maven is used as a built system. Even if maven is not installed it can be used using the maven wrapper. For the commands starting with mvn which makes use of a global installation of maven a substitute is using maven wrapper using ./mvnw. For example the command "mvn clean install" can be executed also using "./mvnw clean install". For the Angular project there has to be node installed. This is developed in Node 10.13.0 


### Installing

Angular - from inside the folder "classroom-frontend" execute the following command

    npm install
    
Spring Boot - from inside the folder "classroom-backend" execute the following command

    mvn clean install
    
### Libraries Used

Angular 
Angular Material

Spring Boot
spring-boot-starter-web
spring-boot-starter-data-jpa
spring-boot-starter-security
mysql-connector-java

## Deployment

For the Angular project use the command "ng serve" to deploy on your develeopment environment. For the Spring Boot project use the command "mvn spring-boot:run" if maven is installed globally or use "./mvnw spring-boot:run"

## Built With

  - [Contributor Covenant](https://www.contributor-covenant.org/) - Used
    for the Code of Conduct
  - [Creative Commons](https://creativecommons.org/) - Used to choose
    the license

## Contributing

Please fork the repo and create an issue, work against it and send a pull request


## Authors

  - **Nandu Dharmapalan** - *Provided README Template* -
    [GitHub](https://github.com/Nandu-D)

See the list of
[contributors](https://github.com/thecodeprofessor/The-Incredible-Dreams/graphs/contributors)
who participated in this project.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE)
GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for
details

## Acknowledgments

  - Nathan Abourbih
  - Jessica Joy
  - David Pelligrini
