import os

COMMAND = {
    "run_watch" : "deno run --allow-net --allow-read --watch app.ts",
    "run" : "deno run --allow-net --allow-read app.ts"
}

def main() :
    print(f"{'#' * 15} Running server by command {COMMAND['run_watch']} {'#' * 15}")

    os.system(str(COMMAND["run_watch"]))
    

if __name__ == "__main__" :
    main()