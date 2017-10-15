# Robots on Mars

## Overview
Solution for Robot code challenge in NodeJs.
Put input file of container and robot instructions and program will output result file of the position of the sent robots and if they wandered off of the grid and got lost!

## Running
optionally install dev packages through `npm install`
input file is currently hard coded to input.txt and should be in the format:
~~~
ContainerX ContainerY
Robot1InitX Robot1InitY Robot1InitOrientation
Robot1InstructionString

Robot2InitX Robot2InitY Robot2InitOrientation
Robot2InstructionString
...
~~~
E.G:
~~~
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
~~~

To run the solution use `npm run start`

## Roadmap
Things to be improved:
* Build script to package src into executable file
* Parameter input for running, eg. input file, output file
* input, output types for output of JSON etc
* Unit tests for stability check
