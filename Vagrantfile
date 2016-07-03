# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

VAGRANTFILE_API_VERSION = "2"

box      = 'ubuntu/trusty64'
# API config box
hostname = 'postgresql-box'
ip       = '192.168.13.1'
ram      = '2048'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.provision "shell", inline: $script
end

Vagrant::Config.run do |config|
    config.vm.box = box
    config.vm.host_name = hostname
    # config.vm.network "private_network", ip: ip
    # config.hostsupdater.aliases = ["postgresql.db"]

    config.vm.share_folder "bootstrap", "/mnt/bootstrap", ".", :create => true
    config.vm.provision :shell, :path => "Vagrant-setup/bootstrap.sh"

    # PostgreSQL Server port forwarding
    config.vm.forward_port 5432, 15432
end
