{
  inputs.nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs =
    {
      self,
      nixpkgs-unstable,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system: with nixpkgs-unstable.legacyPackages.${system}; {
        devShells.default = mkShell {
          buildInputs = [
            nodejs
            corepack
            snyk
          ];
          shellHook = ''
            echo "Node.js version: $(node --version)"
            # pnpm is provided through corepack, which installs the version
            # pinned in package.json ("packageManager").
            export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
            echo "pnpm version: $(pnpm --version)"
          '';
        };
      }
    );
}
