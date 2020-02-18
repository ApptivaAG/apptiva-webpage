with (import (builtins.fetchGit {
  url = https://github.com/nixos/nixpkgs/;
  ref = "19.03";
  rev = "f52505fac8c82716872a616c501ad9eff188f97f";
}) {});

mkShell {
    buildInputs = [
      nodejs-10_x
      autoconf
      automake
      libtool
      file
      pkg-config
      nasm
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
