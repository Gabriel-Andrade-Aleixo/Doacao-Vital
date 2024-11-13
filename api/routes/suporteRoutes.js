const express = require('express');
const router = express.Router();

router.post('/mensagem', (req, res) => {
    const { choice } = req.body;
    let botResponse = '';

    switch (choice) {
        case 'ajuda':
            botResponse = 'Claro, estou aqui para ajudar. Qual das opções abaixo você precisa?';
            break;
        case 'problema':
            botResponse = 'Qual o tipo de problema que você está enfrentando?';
            break;
        case 'contato':
            botResponse = 'Escolha como gostaria de entrar em contato conosco:';
            break;
        case 'documentação':
            botResponse = 'A documentação está disponível em nosso site. Visite a seção de suporte para mais informações!';
            break;
        case 'tutoriais':
            botResponse = 'Você pode encontrar tutoriais em nossa página de ajuda, com vídeos e guias passo a passo.';
            break;
        case 'suporte técnico':
            botResponse = 'Nosso suporte técnico está disponível pelo telefone e por e-mail. Qualquer dúvida, estamos aqui!';
            break;
        case 'onde doar?':
            botResponse = 'Vá para a página de Solicitação para mais informações :)';
            break;
        case 'erro de login':
            botResponse = 'Se estiver com problemas para fazer login, verifique suas credenciais ou entre em contato com o suporte.';
            break;
        case 'outro':
            botResponse = 'Para outros problemas, entre em contato conosco diretamente. Estamos aqui para ajudar!';
            break;
        case 'telefone':
            botResponse = 'Você pode nos ligar pelo telefone: (XX) XXXX-XXXX.';
            break;
        case 'email':
            botResponse = 'Nosso e-mail de suporte é suporte@hemocentro.com. Responderemos o mais rápido possível!';
            break;
        case 'voltar':
            botResponse = 'Claro, vamos recomeçar nossa conversa.';
            break;
        default:
            botResponse = 'Desculpe, não entendi sua escolha.';
            break;
    }

    res.json({ botResponse });
});

module.exports = router;
