su -l
export DISPLAY=10.31.248.211:0
/oracle/t/client/runInstaller
su -l
nano /home/oracle/.bash_profile
. /home/oracle/.bash_profile
netmgr 
file /oracle/app/oracle/product/11.2.0/client_1/bin/sqlplus
sqlplus system/system@siebeldb
exit
touch /oracle/Middleware/Oracle_WT1/instances/instance1/config/OHS/ohs1/htdocs/healthcheck.txt
/home/oracle/http_serv.sh stop
/home/oracle/http_serv.sh start
top -c
find /oracle/Siebel/ -name setmwruntime
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/setmwruntime
ps xa | grep sieb
top -c
ps xa | grep sieb
. /oracle/Siebel/8.1.1.11.0/eappweb/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/eappweb/config/
./config.sh -mode swse
ps xa | grep sieb
top -c
ps xa | grep sieb
top -c
exit
free -m
mount
ls /oracle/t/
unzip /mnt/net/Oracle/Oracle\ Middleware/HTTP\ Server/ofm_webtier_linux_11.1.1.7.0_32_disk1_1of1.zip  -d /oracle/t/
su -l
cd /oracle/t/Disk1/
nano stage/shiphomeinfo.properties
export DISPLAY=10.31.249.146:0
./runInstaller -invPtrLoc /etc/oraInst.loc
nano /home/oracle/http_serv.sh
chmod 755 /home/oracle/http_serv.sh
/home/oracle/http_serv.sh stop
chmod 755 /home/oracle/http_serv.sh
nano /home/oracle/http_serv.sh
/home/oracle/http_serv.sh stop
/home/oracle/http_serv.sh start
su -l
nano /oracle/Middleware/Oracle_WT1/instances/instance1/config/OHS/ohs1/httpd.conf
nano /oracle/Middleware/Oracle_WT1/instances/instance1/config/OHS/ohs1/ssl.conf
nano /home/oracle/.bash_profile
. /home/oracle/.bash_profile
/oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl stopall
/oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl startall
/oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl status
cd /oracle/t/
mc
/oracle/t/Siebel_Enterprise_Server/Disk1/install/runInstaller.sh -invPtrLoc /etc/oraInst.loc
mc
/oracle/t/Siebel_Enterprise_Server/Disk1/install/runInstaller.sh -invPtrLoc /etc/oraInst.loc
chmod -R 755 /oracle/Siebel/8.1.1.11.0/ses
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode enterprise
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/install_script/install/
./CreateDbSrvrEnvScript /oracle/Siebel/8.1.1.11.0/ses ENU Oracle
export | grep LD_LIBRARY_PATH
nano /home/oracle/.bash_profile
. /home/oracle/.bash_profile
export | grep LD_LIBRARY_PATH
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/dbenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user SADMIN /password sadmin
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
export LD_LIBRARY_PATH=/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/lib:${LD_LIBRARY_PATH}
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_install.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_install_lang.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/master_imprep_lang.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_imprep_lang.ucf
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
list_ns
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/install_script/install/CreateSiebSrvrEnvScript
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/install_script/install/
./CreateSiebSrvrEnvScript /oracle/Siebel/8.1.1.11.0/ses/siebsrvr siebelgw:2320 ENU Oracle
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode siebsrvr
nano /home/oracle/sieb_srv.sh
chmod 755 /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh stop
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh start
top -c
ps xa | grep sieb
/oracle/t/Siebel_Web_Server_Extension/Disk1/install/runInstaller.sh -invPtrLoc /etc/oraInst.loc
chmod -R 755 /oracle/Siebel/8.1.1.11.0/eappweb
history 
/home/oracle/sieb_srv.sh stop
. /oracle/Siebel/8.1.1.11.0/eappweb/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/eappweb/config/
./config.sh -mode swse
nano /oracle/Middleware/Oracle_WT1/ohs/bin/apachectl
/home/oracle/http_serv.sh stop
/home/oracle/http_serv.sh start
history 
/home/oracle/sieb_srv.sh start
top -c
history 
/home/oracle/http_serv.sh stop
ps xa | grep sieb
/home/oracle/http_serv.sh stop
ps xa | grep s
cat /home/oracle/http_serv.sh
/home/oracle/http_serv.sh start
history 
/home/oracle/sieb_srv.sh stop
/home/oracle/sieb_srv.sh start
exit
history 
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh start
top -c
ps xa | grep sieb
top -c
cat /home/oracle/sieb_srv.sh
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
cp /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
ps xa | grep reg
ps xa | grep ss
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
exit
ps xa  |grep sieb
ps xa  |grep ss
ps xa  |grep sieb
ps xa  |grep ss
history 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh 
ps xa  |grep ss
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh 
ps xa  |grep ss
ps xa  |grep wat
ps xa  |grep ss
history 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh 
ps xa  |grep ss
ps xa  |grep wat
ps xa  |grep ss
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh 
ps xa  |grep ss
ps xa  |grep wat
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
ps xa | grep wat
ps xa | grep ss
ps xa | grep wat
ps xa | grep ss
ps xa | grep wat
history 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
ps xa | grep wat
ps xa | grep ss
history 
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
ps xa | grep wat
history 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
ps xa | grep wat
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
ps xa | grep sieb
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
cat /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
history 
ps xa | grep sieb
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
ps xa | grep sieb
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
history 
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
 /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
exit
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/mwadm status
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/
mwadm status
./mwadm status
history 
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/siebenv.sh
file /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/regautobackup
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/regautobackup /?
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/regautobackup
history 
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mwadm.sh
/oracle/Siebel/8.1.1.11.0/ses/siebsrvr/mw/bin/regautobackup
nano /home/oracle/sieb_srv.sh 
cat /home/oracle/sieb_srv.sh 
cat /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
nano /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh stop
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
ps xa | grep wat
ps xa | grep ss
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh start
top -c
ps xa | grep sieb
top -c
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh start
ls -lh /tmp/
ps xa | grep sieb
ls -lh /tmp/
mount
su -l
export DISPLAY=10.31.248.241:0
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode enterprise
top -c
history 
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
mount
mc
/home/oracle/sieb_srv.sh start
top -c
mc
pwd
su -l
ls -lh
cp loadingAjax.gif loadingAjax_old.gif
cp welcome_anim.gif loadingAjax.gif
/home/oracle/http_serv.sh stop
/home/oracle/http_serv.sh start
history 
/home/oracle/http_serv.sh stop
cp welcome_anim.gif loadingAjax.gif
/home/oracle/http_serv.sh start
history 
pwd
find /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/ -name loadingAjax
find /oracle/Siebel/8.1.1.11.0/ses/ -name loadingAjax
find /oracle/Siebel/8.1.1.11.0/ses/ -name *.gif
find /oracle/Siebel/8.1.1.11.0/ses/ -name gif
find /oracle/Siebel/8.1.1.11.0/ses/ -name sieb
find /oracle/Siebel/8.1.1.11.0/ses/ -name sieb*
find /oracle/Siebel/8.1.1.11.0/ses/ -name loadingAjax.gif
cp /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/webmaster/images/enu/loadingAjax.gif /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/webmaster/images/enu/loadingAjax_old.gif
history 
pwd
cp welcome_anim.gif loadingAjax.gif
pwd
history | grep Siebel
exit
ps xa | grep sieb
ps xa | grep ss
export DISPLAY=10.31.249.152:0
cd /oracle/Siebel/8.1.1.11.0/ses/oui/bin/
./runInstaller.sh -deinstall -invPtrLoc /etc/oraInst.loc
/home/oracle/http_serv.sh stop
cat /home/oracle/http_serv.sh
/oracle/Middleware/Oracle_WT1/instances/instance1/bin/opmnctl status
export ORACLE_HOME=/oracle/Middleware/Oracle_WT1
cd $ORACLE_HOME/oui/bin
./runInstaller -invPtrLoc /etc/oraInst.loc -deinstall
history 
mc
su -l
cat /etc/hosts
ifconfig 
su -l
exit
history 
mc
history | grep sqplus
history | grep sqlplus
sqlplus system/system@siebeldb
mount
su -l
export DISPLAY=10.31.249.147:0
/oracle/t/Siebel_Enterprise_Server/Disk1/install/runInstaller.sh -invPtrLoc /etc/oraInst.loc
/bin/csh -c chmod -R 755 /oracle/Siebel/8.1.1.11.0/ses
csh -c chmod -R 755 /oracle/Siebel/8.1.1.11.0/ses
chmod -R 755 /oracle/Siebel/8.1.1.11.0/ses
ps xa | grep java
kill 15720
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode enterprise
nao /home/oracle/sieb_srv.sh 
nano /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh stop
nano /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh stop
ps xa  |grep sieb
/home/oracle/sieb_srv.sh start
ps xa  |grep sieb
chkconfig 
su -l
exit
ping siebelapp
su -l
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh start
ps xa | grep sieb
sqlplus sadmin/sadmin@siebeldb
tnsping siebeldb
cat /etc/hosts
su -l
/home/oracle/sieb_srv.sh stop
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/dbenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/

/home/oracle/sieb_srv.sh stop
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/install_script/install/
./CreateDbSrvrEnvScript /oracle/Siebel/8.1.1.11.0/ses ENU Oracle
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/dbenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user SADMIN /password sadmin
/home/oracle/sieb_srv.sh start
ps xa | grep sieb
history | grep sqplus
history | grep sqlplus
sqlplus system/system@siebeldb
mc
mc -a
ps xa | grep sieb
cat /home/oracle/sieb_srv.sh
ps xa | grep sieb
mc
mc -a
mc
mc -a
history 
./odbcsql /source SBA_82_DSN /user GUESTCST /password guestcst
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user GUESTCST /password guestcst
./odbcsql /source SBA_82_DSN /user GUESTCP /password guestcp
mc
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode enterprise
history | grep DISP
export DISPLAY=10.31.249.147:0
./config.sh -mode enterprise
su -l
history 
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user SIEBEL /password siebel
netmgr 
mc
mc -a
/home/oracle/sieb_srv.sh stop
ps xa  |grep sieb
ps xa  |grep mw
/home/oracle/sieb_srv.sh start
ps xa  |grep sieb
mc
mc -a
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/dbenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user SADMIN /password sadmin
top -c
mc
mc -a
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
srvrmgr /g siebelgw /e SBA_82 /u SADMIN /p sadmin
mc
mc -a
su -l
exit
top -c
exit
history 
cat /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
ps xa | grep ss
export DISPLAY=10.31.249.143:0
cd /oracle/Siebel/8.1.1.11.0/ses/oui/bin/
./runInstaller.sh -deinstall -invPtrLoc /etc/oraInst.loc
ls
cd /home/oracle/
mc
cat /etc/host.conf
/oracle/t/Siebel_Enterprise_Server/Disk1/install/runInstaller.sh -invPtrLoc /etc/oraInst.loc
chmod -R 755 /oracle/Siebel/8.1.1.11.0/ses
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/cfgenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode enterprise
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/install_script/install/
./CreateDbSrvrEnvScript /oracle/Siebel/8.1.1.11.0/ses ENU Oracle
export | grep LD_LIBRARY_PATH
. /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/dbenv.sh
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./odbcsql /source SBA_82_DSN /user SADMIN /password sadmin
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
export | grep LD_LIBRARY_PATH
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_install.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_install_lang.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/config/
./config.sh -mode dbsrvr
nano /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/master_imprep_lang.ucf
cd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/bin/
./srvrupgwiz /m master_imprep_lang.ucf
/home/oracle/sieb_srv.sh start
exit
mc
/home/oracle/sieb_srv.sh stop
/home/oracle/sieb_srv.sh start
ps xa | grep sieb
top -c
ps xa | grep sieb
/home/oracle/sieb_srv.sh stop
/home/oracle/sieb_srv.sh start
top -c
mc
top -c
mc
cat /etc/hosts
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
ps xa | grep ss
cat /etc/hosts
/home/oracle/sieb_srv.sh start
top -c
mc
cat NameSrvr.log 
ldd /oracle/Siebel/8.1.1.11.0/ses/siebsrvr/lib/SEor825.so
ps xa | grep sieb
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh start
top -c
mc
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
mc
/home/oracle/sieb_srv.sh start
mc
uptime 
cat /etc/host.conf 
su -l
mc
ps xa | grep sieb
cat /home/oracle/.bash_profile 
ps xa | grep opmn
nano /home/oracle/.bash_profile 
/home/oracle/sieb_srv.sh stop
ps xa | grep oracle
ps xa | grep sieb
export
/home/oracle/sieb_srv.sh start
ps xa | grep sieb
mc
ls -lh /oracle/app/oracle/product/11.2.0/client_1
export
tnsping siebeldb
ps xa | grep sieb
mc
ps xa | grep sieb
top -c
mc
su -
su -l
mc
su -l
/home/oracle/sieb_srv.sh stop
/home/oracle/sieb_srv.sh start
exit
mc
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
ps xa | grep ss
su -l
sudo /sbin/mount.cifs //10.31.97.59/siebel_gw /oracle/gtwysrvr -o user=oradba,password=oradba,uid=54321
su -l
sudo /sbin/mount.cifs //10.31.97.59/siebel_gw /oracle/gtwysrvr -o user=oradba,password=oradba,uid=54321
mc
sudo /sbin/mount.cifs //10.31.97.59/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oradba,password=oradba,uid=54321
sudo /sbin/mount.cifs //10.31.97.10/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oradba,password=oradba,uid=54321
sudo /sbin/mount.cifs //10.31.97.10/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oracle,password=oracle,uid=54321
mc
sudo umount /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr
cd /home/oracle/
sudo umount /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr
nano /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh start
mount
su -l
exit
ps xa | grep sieb
less /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/sys/siebns.dat
exit
mc
ps xa  |grep sieb
mc
history 
sudo /sbin/mount.cifs //10.31.97.59/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oradba,password=oradba,uid=54321
sudo /sbin/mount.cifs //10.31.97.10/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oracle,password=oracle,uid=54321
mc
nnao /home/oracle/sieb_srv.sh 
nano /home/oracle/sieb_srv.sh 
/home/oracle/sieb_srv.sh status
/home/oracle/sieb_srv.sh status ; echo "result: $?"
crm_verify -L -V
su -l
/home/oracle/sieb_srv.sh start
telnet 10.31.97.8 2320
nc
nc 10.31.97.8 2320
nc -v -z -w 3 10.31.97.8 2320; echo $?
nc -v -z -w 3 10.31.97.8 2321; echo $?
crm_resource −−list−agents ocf:heartbeat
exit
su -l
ps xa | grep sieb
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
srvrmgr /g siebelrw /e SBA_82 /u SADMIN /p sadmin
srvrmgr /g 10.31.97.8 /e SBA_82 /u SADMIN /p sadmin
/home/oracle/sieb_srv.sh stop
nano /etc/hosts
su -l
/home/oracle/sieb_srv.sh start
ps xa | grep sieb
top -c
cat /home/oracle/sieb_srv.sh 
su -l
cat /home/oracle/.bash_profile 
ps xa | grep sieb
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
poweroff 
su -l
. /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
srvrmgr /g 10.31.97.8 /e SBA_82 /u SADMIN /p sadmin
ps xa | grep sieb
/home/oracle/sieb_srv.sh stop
su -l
/home/oracle/sieb_srv.sh start
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh start
cat /etc/hosts
/home/oracle/sieb_srv.sh stop
mc
mount
history | grep mount
sudo /sbin/mount.cifs //10.31.97.10/siebel_see /oracle/t -o user=oracle,password=oracle,uid=54321
sudo /sbin/mount.cifs //10.31.97.10/siebel_ses /oracle/t -o user=oracle,password=oracle,uid=54321
mc
su -l
mc
mount
mc
sudo /sbin/mount.cifs //10.31.97.10/siebel_gw /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/ -o user=oracle,password=oracle,uid=54321
mc
mount
ps xa | grep sieb
sudo umount /oracle/t
sudo umount /oracle/Siebel/8.1.1.11.0/ses/gtwysrvr
mc
nano /home/oracle/sieb_srv.sh 
cd /home/oracle/
/home/oracle/sieb_srv.sh start
/home/oracle/sieb_srv.sh stop
mount
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
/home/oracle/sieb_srv.sh stop
ps xa | grep sieb
kill 11098

/home/oracle/sieb_srv.sh start
ps xa | grep sieb
su -l
/home/oracle/sieb_srv.sh status
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh status
/home/oracle/sieb_srv.sh stop
/home/oracle/sieb_srv.sh status
/home/oracle/sieb_srv.sh status ; echo "result: $?"
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh status ; echo "result: $?"
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh status ; echo "result: $?"
nano /home/oracle/sieb_srv.sh
/home/oracle/sieb_srv.sh status ; echo "result: $?"
nano /home/oracle/sieb_srv.sh
exit
su -l
exit
ps xa | grep sieb
su -l
pwd
ls /oracle/Siebel/8.1.1.11.0/ses/
history | grep smb
history | grep sam
cat /etc/hosts
ssh siebelapp
/home/oracle/sieb_srv.sh start
showmount -e siebelapp
cat /etc/hosts
cat /home/oracle/sieb_srv.sh 
/sbin/mount.cifs //10.31.97.10/siebel_ses /oracle/Siebel/8.1.1.11.0/ses/ -o user=oracle,password=oracle,uid=54321
sudo /sbin/mount.cifs //10.31.97.10/siebel_ses /oracle/Siebel/8.1.1.11.0/ses/ -o user=oracle,password=oracle,uid=54321
ping 10.31.97.10
sudo /sbin/mount.cifs //10.31.97.10/siebel_ses /oracle/Siebel/8.1.1.11.0/ses/ -o user=oracle,password=oracle,uid=54321
pcs cluster status
pcs cluster start --all
pcs cluster start
ll
pdw
pwd
/oracle/Siebel/8.1.1.11.0/ses/gtwysrvr/siebenv.sh
reboot
ll
mkdir scripts
cp sieb_srv.sh scripts/
vi sieb_srv.sh 
/etc/init.d/drbd stop
./sieb_srv.sh status
./sieb_srv.sh stop
mount
pcs cluster start
cat sieb_srv.sh 
crm_mon --failcount
