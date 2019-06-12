with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "apptiva-website-shell";
    buildInputs = [
      nodejs-11_x
      autoconf
      automake
      libtool
      file
      pkg-config
      nasm        
    ];
}
