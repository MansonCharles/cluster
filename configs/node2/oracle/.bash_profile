# .bash_profile

# Get the aliases and functions
if [ -f ~/.bashrc ]; then
	. ~/.bashrc
fi

# User specific environment and startup programs

PATH=$PATH:$HOME/bin

export PATH

ORACLE_HOME=/oracle/app/oracle/product/11.2.0/client_1
PATH=$ORACLE_HOME/bin:$PATH
export ORACLE_HOME
export PATH

export LD_LIBRARY_PATH=/oracle/app/oracle/product/11.2.0/client_1/lib:${LD_LIBRARY_PATH}
