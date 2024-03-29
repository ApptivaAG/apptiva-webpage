{
  outputs = { self, nixpkgs,flake-utils }: flake-utils.lib.eachDefaultSystem (system: with nixpkgs.legacyPackages.${system}; {
    devShells.default = mkShell {
      buildInputs = [
        nodejs-16_x
        autoconf
        automake
        libtool
        file
        pkg-config
        nasm
        nodePackages.pnpm

      ];
    };
  });
}