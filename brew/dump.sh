HERE="$( dirname -- "${BASH_SOURCE[0]}" )"
OUT="$HERE/out.txt"
brew leaves > "$OUT"
brew list --cask >> "$OUT" 
