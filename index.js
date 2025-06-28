// Общая функция для отправки запросов GET и POST
async function callGreenApi(method, idInstance, apiToken, body = null) 
{
	const baseUrl = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiToken}`;
  
	const options = {
	  method: body ? 'POST' : 'GET', 
	  headers: { 'Content-Type': 'application/json' }
	};

	if (body) 
	{
	  options.body = JSON.stringify(body);
	}
	
	
	try 
	{
	  const response = await fetch(baseUrl, options);

	  if (!response.ok) 
	  {
		throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
	  }

	  const data = await response.json();
	  return data;
	} 
	catch (error)
	{
	  console.error('Ошибка при запросе:', error);
	  return { error: error.message };
	}

}

// Отображение ответа на странице
const response = document.getElementById('response')
function callback(data)
{
	response.value = JSON.stringify(data, null, 2);
}

// Обработка кнопки getSettings
document.getElementById('getSettings').addEventListener('click', () => 
{
	event.preventDefault(); 
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('ApiTokenInstance').value;
    callGreenApi('getSettings', id, token)
	.then(data => {
	  console.log(data);
	  callback(data);
	});
});

// Обработка кнопки getStateInstance
document.getElementById('getStateInstance').addEventListener('click', () =>
{
	event.preventDefault(); 
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('ApiTokenInstance').value;
    callGreenApi('getStateInstance', id, token)
	.then(data => {
	  console.log(data);
	  callback(data);
	});
});

// Обработка кнопки отправки сообщения

document.getElementById('sendMessage').addEventListener('click', () =>
{
	event.preventDefault(); 
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('ApiTokenInstance').value;
    const num = document.getElementById('messageNumber').value;
    const content = document.getElementById('messageContent').value;
	
	const body = {
	  chatId: `${num}@c.us`,
	  message: content
	};

    callGreenApi('sendMessage', id, token, body)
	.then(data => {
	  console.log(data);
	  callback(data);
	});
});

// Обработка кнопки отправки файла по URL

document.getElementById('sendFileByUrl').addEventListener('click', () =>
{
	event.preventDefault(); 
    const id = document.getElementById('idInstance').value;
    const token = document.getElementById('ApiTokenInstance').value;
    const num = document.getElementById('urlNumber').value;
    const content = document.getElementById('urlContent').value;
	
	const body = {
	  chatId: `${num}@c.us`,
	  urlFile: content
	};

    callGreenApi('sendFileByUrl', id, token, body)
	.then(data => {
	  console.log(data);
	  callback(data);
	});
});