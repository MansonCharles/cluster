#!/bin/sh
USAGE="usage: http_srvr.sh { stop | start | status}"
if [[ $(id -u) -eq 0 ]] ; then echo -e "Please never run as root this script!!! \nYou must use only oracle login." ; exit 1 ; fi 
. ~/.bash_profile
  case $* in
    start) /oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl startall
        ;;
    stop) /oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl stopall
        ;;
    status) /oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl status
        ;;
    *)
        echo "Unrecognized switch: $*"
        echo "$USAGE"
        exit 1
        ;;
  esac
