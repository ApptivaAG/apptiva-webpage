{
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system: with nixpkgs.legacyPackages.${system}; {
        devShells.default = mkShell {
          buildInputs = [
            nodejs
            pnpm
            snyk
          ];
          shellHook = ''
            export BIOME_BINARY=${biome}/bin/biome
          '';
        };
      }
    );
}
