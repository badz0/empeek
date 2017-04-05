(function () {
    'use strict';

    angular
        .module('app.clusters')
        .controller('AddClusterController', AddClusterController);

    AddClusterController.$inject = ['$uibModalInstance',  '$location', '$q', 'clustersService', 'clustersConstants', 'resourceTags', 'customerDnsPrefix', 'applicationHost'];

    function AddClusterController($uibModalInstance, $location, $q, clustersService, clustersConstants, resourceTags, customerDnsPrefix, applicationHost) {
        var vm = this,
            isAutoScaling = 0;


        vm.resourceTags = resourceTags;
        vm.can_input = 0;
        vm.can_output = 0;
        vm.can_process = 0;
        vm.namePattern = '[a-z0-9]*([a-z0-9]+)';
        vm.host_prefix = $location.host();
        vm.scalingTypes = [];
        angular.copy(clustersConstants.scalingTypes, vm.scalingTypes);
        vm.closeModal = closeModal;
        vm.saveCluster = saveCluster;
        vm.setScalingBoolean = setScalingBoolean;
        vm.getVpcList  = getVpcList;
        vm.getSubnetList = getSubnetList;
        vm.customer_dns_prefix = customerDnsPrefix;
        vm.application_host = applicationHost;

        activate();

        function activate() {
            var promises = [getAws()];
            return $q.all(promises).then(function () {
                for (var prop in vm.aws) {
                    vm.scalingTypes.push(vm.aws[prop]);
                }
            });
            var index = vm.host_prefix.indexOf('.');
            if (index != -1){
                vm.host_prefix = vm.host_prefix.substring(0, index);
            }
        }

        function setScalingBoolean(isAutoScalingVal) {
            isAutoScaling = isAutoScalingVal;
        }

        function saveCluster() {

            var model = {
                "name": vm.name,
                "resource_tag_id": vm.resource_tag_id,
                "dns_prefix": vm.dns_prefix,
                "can_input": vm.can_input,
                "can_output": vm.can_output,
                "can_process": vm.can_process,
                "scaling": vm.scaling.groupName || vm.scaling.key,
                "is_auto_scaling": isAutoScaling
            };

            if (isAutoScaling) {
                model = _.extend(model, {
                    "vpc": vm.vpc,
                    "region": vm.scaling.region,
                    "subnet": vm.subnet,
                    "min_size": vm.min_size,
                    "max_size": vm.max_size
                });
            }

            return clustersService.addCluster(model).then(function (data) {
                model.id = data;
                $uibModalInstance.close(model);
            });

        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');

        }

        function getAws() {
            return clustersService.getAws().then(function (data) {
                vm.aws = data;
                for (var prop in vm.aws) {
                    vm.aws[prop].groupName = 'AWS';
                    vm.aws[prop].region = prop;
                }
                return vm.aws;
            });
        }
        function getVpcList(scaling_region){
            if(scaling_region){
                vm.vpcList = vm.aws[scaling_region].vpcs;
                for (var prop in vm.vpcList) {
                    vm.vpcList[prop].key = prop;
                }
            }
        }

        function getSubnetList(vpc){
            if(vpc){
                vm.subnetList = vm.vpcList[vpc].subnets;
            }
        }


    }

})();

