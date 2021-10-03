#!/bin/sh

for F in scc/*.mml ; do echo $F && mgsc-js $F -o ${F%.mml}.mgs ; done

