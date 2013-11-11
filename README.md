# downloadur

Expriemental download accelerator via http byte range fetching.

## Current Plan / Braindump

How its (probably) going to work:

### State: detect
  1. detect if range is available if it is -> fast path || slow_path
  2. detect if size is large enough (10mb?? no idea yet) if its big enough fast path || slow_path
  
### State: Slow Path
  1. http.get -> pipe to dest (one get)

### State: Fast Path

#### Terminology
  * worker = single get request (readable stream)
  * pool = collection of workers collectively working to donwload a single resource
  * pool size = number of workers in the pool
  * worker size = number of bytes a single worker is trying to get
 
  
#### Steps

  1. start with pool of N workers with a very small (<1mb?) worker size
  2. measure latency of connection/time to data packets
  3. measure bytes over time with current pool size
  4. increase pool size in such a way to increase the number of parallel workers
  5. utilize data of measurements to increase / decrease pool size / worker size

To make sure this works:

  *  Identify a set of sufficently large enough files for remote testing (think order of 100mb files on S3)
  *  TravisCI is the target of optimizations (for the moment)
  *  measurements should take place very quickly during the initialization the download and stop therafter. 
     There maybe cases where network fluctuates significantly while we are download a massive file but the idea
     is to optimize quickly (best effort) then stop measuring to keep overhead very low. If overhead is not an issue
     we can optimize on the fly (maybe with a less expensive algorithm)
  * expirement with both pool size AND worker size
