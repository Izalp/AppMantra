export const loginService = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@email.com' && password === 'senha123') {
          resolve('Login bem-sucedido');
        } else {
          reject('Credenciais inválidas');
        }
      }, 1000);
    });
  };
  