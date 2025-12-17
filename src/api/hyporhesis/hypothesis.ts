import type { HypothesisResponse } from '@/types';
import { HYPOTHESIS_URL } from '@consts';
import { HypothesisFromDTO } from './hypothesisDTO';

const hypothesisUrl = (host: string) => `${HYPOTHESIS_URL}/${host}`;

const fetchHypothesisMock = () => {
	const data = {
		type: 'hypothesis',
		data: {
			investigation_suggestions: [
				{
					title: 'Админ-спуфинг в /flag через cookie/ticket',
					reasoning:
						'Endpoint /flag прямо заявляет, что флаг доступен «только пользователю admin». При этом в /login отсутствует видимый токен (no JWT, no Set-Cookie). Вероятно, сервер выдаёт скрытый ticket (cookie, header, body-param) с признаком роли. Проверка роли на /flag происходит серверно, значит уязвимость может быть в логике выдачи/проверки этого ticket. Если можно заставить /login выдать «admin-ticket» или подделать его значение, получим прямой bypass.',
					affected_endpoints: [
						'http://tasks.duckerz.ru:30056/login',
						'http://tasks.duckerz.ru:30056/flag',
					],
					what_to_check: [
						'Перехватить полный ответ /login: посмотреть скрытые заголовки, cookies, поля JSON/TEXT',
						"Повторить /login с разными credential-наборами (admin/admin, admin:admin, 'or 1=1-- и т.д.) и сравнить выдаваемые ticket-значения",
						'Подставить каждое полученное значение в запрос к /flag (cookie, header X-Ticket, параметр ?ticket=) и зафиксировать изменение ответа',
						'Если значение JWT-подобное — расшифровать (jwt.io), подделать поле role=admin, подписать при необходимости (crack weak secret) и повторить запрос',
					],
					priority: 'recommend',
					cross_endpoint_pattern:
						'Скрытая аутентификационная кука/ticket между /login и /flag',
				},
				{
					title: 'NoSQL-инъекция в /login (авторизация admin без пароля)',
					reasoning:
						'Имя приложения BoldLogin и отсутствие классического токена намекают на NoSQL/SQL-СУБД с выражением вида db.users.findOne({user:USER,pass:PASS}). Если параметры не экранируются, можно передать объект {"$ne":null} или {"$regex":"^admin"}, что заставит запрос вернуть первого подходящего пользователя (обычно admin). Это даёт вход без пароля и, как следствие, «admin-ticket» для /flag.',
					affected_endpoints: ['http://tasks.duckerz.ru:30056/login'],
					what_to_check: [
						'Отправить POST /login Content-Type:json {"user":{"$ne":null},"pass":{"$ne":null}}',
						'Повторить с {"user":{"$regex":"^admin"},"pass":{"$ne":null}}',
						"Если ответ содержит признак успеха (status 200, Set-Cookie, тело 'welcome') — сразу идти на /flag с полученной cookie",
						'В случае блокировки — пробовать операторы $where, $gt, $lt и разные кодировки (URL, Unicode)',
					],
					priority: 'recommend',
				},
				{
					title: 'Обход аутентификации через заголовки/параметры',
					reasoning:
						'Поскольку технологии не определены, вероятен CGI/WSGI-стек (Python Flask, Node Express, Go net/http). Часто роль вычисляется по внутреннему заголовку X-User-Role или параметру ?role=admin. Проверка на /flag может опираться на этот же источник, а не на жёстко заданную сессию. Достаточно добавить нужный заголовок/параметр в GET /flag.',
					affected_endpoints: ['http://tasks.duckerz.ru:30056/flag'],
					what_to_check: [
						'Выполнить GET /flag с заголовками: X-User-Role:admin, X-Forwarded-User:admin, X-Original-User:admin',
						'Добавить параметры: /flag?role=admin\u0026user=admin\u0026isAdmin=true',
						'Проверить влияние заголовка X-Original-URL и X-Rewrite-URL (иногда позволяют вызвать /admin/flag вместо /flag)',
						'Фиксировать изменения: появление флага в теле, статус 200, отличный по длине ответ',
					],
					priority: 'consider',
				},
				{
					title: 'Жёсткие учётные данные admin/admin в /login',
					reasoning:
						'Название BoldLogin может намекать на CTF-дефолт. В 70 % подобных задач admin:admin или admin:password работают из коробки. Проверка занимает секунды и сразу даёт доступ к /flag.',
					affected_endpoints: ['http://tasks.duckerz.ru:30056/login'],
					what_to_check: [
						'POST /login user=admin\u0026pass=admin (form), затем GET /flag',
						'Повторить для pass=password, 123456, qwerty',
						'Если успех — задокументировать полученный флаг и не исследовать дальше',
					],
					priority: 'consider',
				},
			],
			site_understanding: {
				likely_architecture:
					'Минималистичный монолит (Flask/Express/Go) без фронт-фреймворка',
				auth_mechanism:
					'Скрытая server-side сессия (cookie или ticket), JWT не обнаружен',
				data_sensitivity:
					'Флаг CTF (high-value), username/password (low)',
				attack_surface_summary:
					"Три endpoint'а: главный риск — обход аутентификации в /login для получения admin-доступа к /flag. Классическая CTF-задача: «войти как admin».",
			},
		},
	};
	return new Promise<{ json: () => any }>((resolve) => {
		setTimeout(() => {
			resolve({
				json: () => Promise.resolve(data),
			});
		}, 2000);
	});
};

const fetchHypothesis = async (host: string) => {
	// console.log('fetch', host);
	const response = await fetch(hypothesisUrl(host), { method: 'POST' });
	// const response = await fetchHypothesisMock();
	const responseData = (await response.json()) as HypothesisResponse;
	// console.log('responseData: ', responseData);
	return HypothesisFromDTO(responseData.data);
};

export const hypothesisApi = {
	fetchHypothesis,
};
