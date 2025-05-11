Run application:
 - run this command on another terminal:  docker compose down
  - now run:  docker compose down
  - run: docker compose up --build

this reads all devices:
 - curl --location 'localhost:3000/devices'

this fetch device by id:
 - curl --location 'localhost:3000/devices/6820b602d8ca27f98f17d749'

this one create a device:
  -  curl --location 'localhost:3000/devices' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Device2",
        "brand": "bestBrand",
        "state": "available"
    }'

this patch update partialy or all the object:
- curl --location --request PATCH 'localhost:3000/devices/6820b7630069b95c108dc5aa' \
  --header 'Content-Type: application/json' \
  --data '{
      "state": "in-use"
  }'

About the coverage test:
  command to Run coverage test:
    - docker-compose up test-runner
  while running the docker compose run this command to generate the coverage report
  - docker cp test-runner:/app/coverage ./coverage
    - open the -> coverage folder -> open the lcov-report, on index.html click the right button and select copy path

  ![alt text](image.png)


 