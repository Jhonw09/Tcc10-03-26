import UsuarioService from './UsuarioService';

export const atualizarUsuario = (id, data) => UsuarioService.update(id, data);
export const deletarUsuario = (id) => UsuarioService.inativar(id);
export const getCertificados = () => Promise.resolve([]);
