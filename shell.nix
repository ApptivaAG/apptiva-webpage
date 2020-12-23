with import <nixpkgs> {};

mkShell {
    buildInputs = [
      nodejs-14_x
      autoconf
      automake
      libtool
      file
      pkg-config
      nasm
    ];
}
