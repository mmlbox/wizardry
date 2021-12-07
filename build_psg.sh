for F in scc/*.mml; do
  T=${F#scc/wiz1_}
  T=${T%.mml}
  T=psg/wiz1_p$T
  echo "$F -> ${T}.mml"
  node make_psg $F > ${T}.mml
  echo "${T}.mml -> ${T}.mgs"
  mgsc-js ${T}.mml -o ${T%.mml}.mgs
done