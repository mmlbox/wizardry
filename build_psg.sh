for F in scc/*.mml; do
  T=${F#scc/wiz1_}
  T=${T%.mml}
  T=psg/wiz1_p$T
  echo "$F -> ${T}.mml"
  node make_psg $F > ${T}.mml
  echo "$F -> ${T}.mgs"
  mgsc-js $F -o ${T}.mgs
done