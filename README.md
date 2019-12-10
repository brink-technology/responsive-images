# Responsive Images

## Install
`npm i -g @findthebrink/responsive-images`

## Usage
`responsive-images` is a CLI tool that will generate a set of responsive images from a single source

```
Usage: responsive-images [options] <image>

Options:
  -V, --version                       output the version number
  -d, --debug                         Enable debugging (default: false)
  -o, --output-directory <directory>  The directory to output to (default:
                                      "/home/derek/developer/responsive-images/images__output")
  -w, --widths [px]                   The widths required, separated by commas,
                                      in pixels. E.g., 1024,640,320 (default:
                                      ["original",1024,640,320])
  -f, --formats [format]              The file formats to output, separated by
                                      commas. E.g., jpg,jp2,webp (default:
                                      ["jpg","jp2","webp"])
  -h, --help                          output usage information

```
