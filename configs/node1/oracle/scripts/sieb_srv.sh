#!/bin/sh
USAGE="usage: siebel_srvr.sh { stop | start }"
if [[ $(id -u) -eq 0 ]] ; then echo -e "Please never run as root this script!!! \nYou must use only oracle login." ; exit 1 ; fi
. ~/.bash_profile
NodeIP=10.31.97.59
ClusterIP=10.31.97.8
  case $* in
    start)
        nc -w 3 $NodeIP 2320
        if [ $? == 0 ]; then echo "Siebel Gateway on port 2320 on Node IP = $NodeIP running."; exit 0; fi
        nc -w 3 $ClusterIP 2320
        if [ $? == 0 ]; then echo "Siebel Gateway on port 2320 on Cluster IP = $ClusterIP running. Siebel Gateway not run one more."; exit 0; fi
        sudo /sbin/mount.cifs //10.31.97.10/siebel_ses /oracle/Siebel/8.1.1.11.0/ses/ -o user=oracle,password=oracle,uid=54321
        . /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
        /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/bin/start_ns
        ;;
    stop)
        nc -w 3 $NodeIP 2320
        if [ $? == 1 ]; then echo "Siebel Gateway on port 2320 on Node IP = $NodeIP not running."; exit 0; fi
        if [ -f /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh ]; then
                . /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
                /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/bin/stop_ns
                sudo umount /oracle/Siebel/8.1.1.11.0/ses
        else
                echo "Ses not mount. Siebel Gateway not starting and stopping."; exit 3;
        fi
        ;;
    status)
        nc -w 3 $NodeIP 2320
        if [ $? == 1 ]; then echo "Siebel Gateway on port 2320 on Node IP = $NodeIP not running."; exit 3; fi
        if [ -f /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh ]; then
                . /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
                /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/bin/list_ns
        else
                echo "Ses not mount. Siebel Gateway not running."; exit 3;
        fi
        ;;
    *)
        echo "Unrecognized switch: $*"
        echo "$USAGE"
        exit 1
        ;;
  esac
