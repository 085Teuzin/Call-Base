// Escutando cliques na notificação
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'reply') {
        const replyText = event.reply;
        console.log("Usuário respondeu via notificação:", replyText);
        // Aqui o dado seria enviado ao Firebase, mas como o SW é isolado,
        // o ideal é focar em abrir o app para resposta ou usar BroadcastChannel.
    } else {
        // Abre o app se clicar na notificação
        event.waitUntil(
            clients.matchAll({ type: 'window' }).then(windowClients => {
                if (windowClients.length > 0) return windowClients[0].focus();
                return clients.openWindow('/');
            })
        );
    }
});
