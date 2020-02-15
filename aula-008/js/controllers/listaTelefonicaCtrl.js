angular.module('listaTelefonica')
    .controller('listaTelefonicaCtrl',
        (
            $scope,
            contatosAPI,
            operadorasAPI,
            serialGenerator
        ) => {
            $scope.app = 'Lista Telefônica';

            $scope.contatos = [];
            $scope.operadoras = [];

            var carregarContatos = async () => {
                try {
                    const response = await contatosAPI.getContatos();
                    $scope.contatos = response.data;
                    $scope.$apply();
                } catch (err) {
                    console.error(err);
                }
            }

            var carregarOperadoras = async () => {
                try {
                    const response = await operadorasAPI.getOperadoras();
                    $scope.operadoras = response.data;
                    $scope.$apply();
                } catch (err) {
                    console.error(err);
                }
            }

            $scope.adicionarContato = async (contato) => {
                contato.serial = serialGenerator.generate();
                contato.data = new Date();

                try {
                    await contatosAPI.saveContatos(contato)
                    delete $scope.contato
                    $scope.contatoForm.$setPristine();
                    carregarContatos();
                } catch (err) {
                    console.error(err);
                }
            }

            $scope.apagarContatos = (contatos) => {
                $scope.contatos = contatos.filter((contato) => {
                    if (!contato.selecionado) return contato;
                });
            }

            $scope.isContatoSelecionado = (contatos) => {
                return contatos.some(contato => {
                    return contato.selecionado;
                });
            }

            $scope.ordenarPor = (campo) => {
                $scope.criterioDeOrdenacao = campo;
                $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
            }

            carregarContatos();
            carregarOperadoras();
        }
    );