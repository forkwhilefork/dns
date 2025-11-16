/*
   dnsconfig.js: dnscontrol configuration file
*/

// Providers:

var REG_NONE = NewRegistrar('none');    // No registrar.
//var REG_OPENSRS = NewRegistrar('opensrs');
var REG_PORKBUN = NewRegistrar('porkbun');
//var REG_MONITOR = NewRegistrar('dns-over-https');

var DNS_ROUTE53 = NewDnsProvider('route53');

// Constants:

var GOOGLE_WORKSPACE_MX = [
  MX('@', 1, 'smtp.google.com.'),
]

var GITHUB_PAGES_A_AAAA = [
  A('@', '185.199.108.153'),
  A('@', '185.199.109.153'),
  A('@', '185.199.110.153'),
  A('@', '185.199.111.153'),
  AAAA('@', '2606:50c0:8000::153'),
  AAAA('@', '2606:50c0:8001::153'),
  AAAA('@', '2606:50c0:8002::153'),
  AAAA('@', '2606:50c0:8003::153'),
]

var XEF_A_TXT = [
	A('@', '74.119.148.1'),
	TXT('@', 'xenyth-cust-340'),
]

var FASTLY_A = [
	A('@', '151.101.1.242'),
	A('@', '151.101.129.242'),
	A('@', '151.101.193.242'),
	A('@', '151.101.65.242'),
]

var DMARC_TXT = [
	DMARC_BUILDER({
		policy: 'reject',
		subdomainPolicy: 'reject',
		percent: 100,
		alignmentSPF: 'strict',
		alignmentDKIM: 'strict',
		rua: [
		  'mailto:rina@tajvar.io',
		],
		failureOptions: '1',
		reportInterval: '1d',
	  })
]

// Domains:

D("howdoesthepstn.work", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d'),
  GITHUB_PAGES_A_AAAA
)

D("howdoestheinternet.work", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
  GITHUB_PAGES_A_AAAA
)

D("stream.af", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	A('download', '23.147.64.113'),
	AAAA('download', '2620:39:6000:101::11'),
	A('olaris', '23.147.64.119'),
	AAAA('olaris', '2620:39:6000:101::26'),
	A('plex', '23.147.64.123'),
	A('requests', '23.147.64.121'),
	AAAA('requests', '2620:39:6000:101::20'),
	CNAME('updates-mail', 'sendy.booktags.app.'),
	A('updates', '23.147.64.105'),
	MX('updates', 10, 'inbound-smtp.us-east-1.amazonaws.com.'),
	TXT('_amazonses.updates', 'Nm9sl7P0+h3k49kAZ7N4PZGvuCmmwTlZPCa/gbmwI2o='),
	CNAME('2abo5z6uoio4xfyrc54dk2geioammwf2._domainkey.updates', '2abo5z6uoio4xfyrc54dk2geioammwf2.dkim.amazonses.com.'),
	CNAME('c2ofg7syuvt6jjrbcn6rli2zzymzvsn6._domainkey.updates', 'c2ofg7syuvt6jjrbcn6rli2zzymzvsn6.dkim.amazonses.com.'),
	CNAME('cqtpjrqnal7wlfxch54mihjvnsz4j7gs._domainkey.updates', 'cqtpjrqnal7wlfxch54mihjvnsz4j7gs.dkim.amazonses.com.')
)

D("booktags.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	MX('@', 10, 'mail.booktags.app.'),
	TXT('@', 'v=spf1 mx include:mailgun.org -all'),
	DMARC_TXT,
	TXT('mailcow2._domainkey', 'v=DKIM1;k=rsa;t=s;s=email;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwazEHN6bKAeoi6xLfP0itaMeRDDva38B/h8W3UYyKhwpgtJs/2iPBOnkFCqitaWYbtwA7sKXMOHmjrBwJSZO6FbXJZ5cqX0CkZHmxOamBUi8oDRZhQaX/P74CRZCAahzVIqGpmbyDzlFREm7jRPbYWQlA6hdtNDpZVRGgZYVqgwIDAQAB'),
	A('alpha', '23.147.64.132'),
	AAAA('alpha', '2620:39:6000:102::4'),
	CNAME('autoconfig', 'mail.booktags.app.'),
	CNAME('autodiscover', 'mail.booktags.app.'),
	A('discourse', '23.147.64.120'),
	AAAA('discourse', '2620:39:6000:101::16'),
	MX('discourse', 10, 'mxb.mailgun.org.'),
	MX('discourse', 10, 'mxa.mailgun.org.'),
	TXT('discourse', 'v=spf1 include:mailgun.org -all'),
	TXT('mx._domainkey.discourse', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4KlKRuXL3FmhpaRGrqBHXq1X5+EXm51ZEihBTTGILal3XfUq57+SRhlo0HfV6mGdCJVn9GucRBq3/HRwZqE9r1mc1DuM+md2lJJVo4W/S4X/7R5ufwnFjhFbs0eET65hSRTVug4d+EtOWGlWDzba22wAO49OBB7jviA5CgOI/swIDAQAB'),
	AAAA('fider', '2620:39:6000:101::9'),
	MX('fider', 10, 'mxb.mailgun.org.'),
	MX('fider', 10, 'mxa.mailgun.org.'),
	TXT('fider', 'v=spf1 include:mailgun.org -all'),
	A('gitlab', '23.147.64.111'),
	AAAA('gitlab', '2620:39:6000:101::10'),
	MX('gitlab', 10, 'mxb.mailgun.org.'),
	MX('gitlab', 10, 'mxa.mailgun.org.'),
	TXT('gitlab', 'v=spf1 include:mailgun.org -all'),
	TXT('smtp._domainkey.gitlab', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDyU6JczqwuUrrN9YWWsYNqWk9kfTzUoOyJfB3xIxz+Jt+q6M7/Pl9NDUAYW0mYkaVTXFPRCKfHYanL+iheNxNLYj2Uxi44Gl/Y9Y+sGqoSGxZDxnpyKNe7hlW3WX2wt9lEAUM/YnQv3R/Ysj0JCuB8otoMt8TYvNI9lCz/0Ow5GQIDAQAB'),
	A('mail', '23.147.64.112'),
	AAAA('mail', '2620:39:6000:101::8'),
	A('pw', '23.147.64.118'),
	AAAA('pw', '2620:39:6000:101::14'),
	A('sendy', '23.147.64.115'),
	AAAA('sendy', '2620:39:6000:101::17')
)

D("rekt.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	MX('@', 10, 'mxa.mailgun.org.'),
	MX('@', 10, 'mxb.mailgun.org.'),
	A('aa', '23.147.64.102'),
	AAAA('aa', '2620:39:6000:101::4'),
	A('chat', '23.147.64.104'),
	AAAA('chat', '2620:39:6000:101::7'),
	TXT('chat', 'v=spf1 include:mailgun.org -all'),
	TXT('mx._domainkey.chat', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1FxnJq4iTUdsD6yX+xGAe9uaZAdbeJ9Q7wHIB0SKqiJFdr5Z1paIvARv+H5D+5gN5w27xGytF8H/l3NkpYaNLdRnOrNYWNfIbJVmsI+OQw2X4m2hhgHl03Zlr1FU/YNxpopn+ZSEECvsLi/aXJff/OZomBWVPTJE5/OwjhqABFwIDAQAB'),
	A('ha', '23.147.64.133'),
	AAAA('ha', '2620:39:6000:102::5'),
	A('irc', '23.147.64.122'),
	AAAA('irc', '2620:39:6000:101::22'),
	A('minecraft', '23.147.64.134'),
	TXT('mailo._domainkey.social', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6BXk/609ViOsNsYYkB2vuhFWEnomurL8juFqpFaa1GweRsg6wo/heJ4SmtUflqOgh262jDkKD5kSjgjzOa+eRlem+mexVj6kIFK6PAQ4wtr9LnRMJ7fDjapx51R//MU2IjUQJpWGyIawhhZBZXMNepoAT4KAVe6liHes/JjShXwIDAQAB'),
	A('paperless', '23.147.64.135'),
    A('unifi', '23.147.64.110'),
	AAAA('unifi', '2620:39:6000:101::24')
)

D("ruya.art", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT
)

D("bgp.community", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT,
	TXT('@', 'https://docs.google.com/spreadsheets/d/1dkZmQzY0slt_uIAr6Aq_Y-2rq9dH5vdzGrpTi2lTq_I/edit#gid=0')
)

D("noc.contact", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT
)

D("ross.help", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT
)

D("tajvar.io", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	GOOGLE_WORKSPACE_MX,
    IGNORE_NAME("home", "A"),
	TXT('@', 'v=spf1 include:_spf.google.com -all'),
	TXT('@', 'google-site-verification=pLLkvQJq_d5yrPTK5jc9MZXRSU2VI2nQh0wzrbivVJE'),
	TXT('tagcat.org._report._dmarc', 'v=DMARC1'),
	TXT('google._domainkey', ['v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArXZYhoNDopLRRDUAlju6AYXOvzGp0bajF5zq8tuEmalj7QUAX7+Ywvda5C4nrynBVXpBUHlWgJK2ybiYTo47zV2pur37w7zFqeud4PulEgUxyU/dEWFpmJpSo+VFdlf1tBm6kMHUnWjMkdOWCjlYmV9vvleJcm2/h1DmInZeYj9Gt3DrT4SBNP9+kkBxSK/z0', 'L1ayaqrTHyvyaKX6NSCnTwIqqwwTE9gDUpeyqfuzVs96qpQo9LdR8r4yUueImkphKZu/sZzARFRJi/E0x/RlLB1srmZ77Gr62W+TBem+YKFeFdPTqnPaKMyedaTBSjiNx+m3cwYA4omD95el9OuhQIDAQAB'])
)

D("voip.lol", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	MX('e', 10, 'mxa.mailgun.org.'),
	MX('e', 10, 'mxb.mailgun.org.'),
	TXT('e', 'v=spf1 include:mailgun.org -all'),
	TXT('mailo._domainkey.e', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0Z9X0X9+r5FBWNsZFHr+HF1Ii8WShLrPrewOr36LKY2ubnNN9jsI4tPP6Giu6w7QPa9oxY10KF+2odF2flniDxdb8gVrNCmB/qpZD80WyNcOkfDmRnkulg9MU7BEcmHzggnbfII3FNmwSsRNoKTHsR5QIM5oF8XJFSnpQDgS6swIDAQAB'),
	A('pbx', '23.147.64.109'),
	AAAA('pbx', '2620:39:6000:101::27')
)

D("telhami.me", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	GOOGLE_WORKSPACE_MX,
	TXT('@', 'google-site-verification=ctHVEEr_20glMAblfsidxfHtI-28gKRZeBN5jZx7Vvs')
)

D("forksystems.net", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	GITHUB_PAGES_A_AAAA,
	GOOGLE_WORKSPACE_MX,
	TXT('@', 'google-site-verification=yjSaILToj_klNS6VuWEAXw6nhakDqaw3QRKBGmmiNUE'),
	TXT('@', 'v=spf1 include:_spf.google.com include:mailgun.org -all'),
	TXT('smtp._domainkey', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0JgyCkyUQiC8uvnrpxVYsjrhAhOs6avtzp04AQ7D4R9NzI1qe2aL7boDq3XAT+onHe5Jso2TqBISzlFc/NBonNtIO/tlKo6u4khkpxSyNMLpTQ88nC1UHVJBgMH+BTD12x1r0A1cPFMOp7szHBOSYz484igWdhqBxNj3pHHRccwIDAQAB'),
	A('irr', '23.147.64.73'),
	AAAA('irr', '2620:39:6000:100::7'),
	CNAME('lg', 'managed-lg.bgp.tools.'),
	A('librenms', '23.147.64.76'),
	AAAA('librenms', '2620:39:6000:100::13'),
	MX('librenms', 10, 'mxa.mailgun.org.'),
	MX('librenms', 10, 'mxb.mailgun.org.'),
	TXT('librenms', 'v=spf1 include:mailgun.org -all'),
	TXT('mailo._domainkey.librenms', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC698qLCFT3NhsND2XTFaVpFXsOF3UXtP9WzUzUEAPH534RmzgNTq2bt8ZN2QoMWtrIup7PVJ7D8gWZQsd2NSjS1B4J3UpbiwVomoVgPqN2agDzkPlE0Pv0MVdu8xtk4QDYwFzpb9ziGEHrOuunMBsxsho6xNkv49RoF4taXBl07QIDAQAB'),
	A('misc1', '74.119.150.121'),
	AAAA('misc1', '2602:fd50:101:12b7:c75e:c6c7:8fc6:6ed6'),
	A('monitoring', '74.119.150.121'),
	AAAA('monitoring', '2602:fd50:101:12b7:c75e:c6c7:8fc6:6ed6'),
	A('support', '23.147.64.75'),
	AAAA('support', '2620:39:6000:100::10')
)

D("whycantiget.online", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT
)

D("tajvar.pw", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	A('@', '23.147.64.118'),
	AAAA('@', '2620:39:6000:101::14'),
	MX('@', 10, 'mxa.mailgun.org.'),
	MX('@', 10, 'mxb.mailgun.org.'),
	TXT('@', 'v=spf1 include:mailgun.org -all'),
	TXT('mailo._domainkey', 'k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDbBn74fDUaI+7gEZK6e+ilOZXyTKyeVeZypSnY8pQEcUJB30W8wcWi9ITfla6cXOLmEukzS1PW9m0fA4HJtiNEFCUirpA68C7YwcazxxjED/3qUVgeLgm/IvnbYXbKdrtG6ndMXmQnyM0n6F25T0ZPTBJhxS8JYsb1F6aSJwMqzwIDAQAB')
)

D("loa.tools", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	GITHUB_PAGES_A_AAAA
)

D("netdial.us", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	GOOGLE_WORKSPACE_MX,
	TXT('@', 'google-site-verification=xHpOniNOKZXD20cgyy9iNNSUs4AdYrN8MA4DveTpH98'),
	TXT('@', 'v=spf1 include:_spf.google.com -all'),
	DMARC_TXT
)

D("netdial.io", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("tag-cat.com", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("tag-cat.org", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
	XEF_A_TXT
)

D("pleasecl.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("takean.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("treasurem.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("whatisthiscr.app", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("zf.ax", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d'),
    A('@', '23.147.64.75'),
    AAAA('@', '2620:39:6000:100::10')
)

D("as25682.net", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("as807.net", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("ndial.net", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("fork.tel", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("bunchof.tools", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("irr.tools", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("binge.zone", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
	DefaultTTL(3600),
	NAMESERVER_TTL('2d')
)

D("everydayireceive.email", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("bgp.chat", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d'),
  XEF_A_TXT
)

D("bgp.camera", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("toomuch.network", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("webbed.site", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d'),
  A('minecraft', '23.147.64.116')
)

D("dfz.lol", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("becrimesdo.gay", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("arp.tools", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("fax.tools", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("regex.tools", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("rina.business", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("rina.diy", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("rina.help", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("telephony.tools", REG_PORKBUN, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("firmware.download", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("shesjustlikeme.fr", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d'),
  FASTLY_A,
  CNAME('_acme-challenge', 's844x3e638yvpuqtno.fastly-validations.com.')
)

D("as942.net", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d')
)

D("ri.na", REG_NONE, DnsProvider(DNS_ROUTE53, 4),
  DefaultTTL(3600),
  NAMESERVER_TTL('2d'),
  FASTLY_A,
  GOOGLE_WORKSPACE_MX,
  TXT('@', 'google-site-verification=yDKwamFIzfTddNWK1qyA4D3-tzMk9bkT6fEscXLcg24'),
  CNAME('_acme-challenge', 't0sihb0se21xgijjdm.fastly-validations.com.')
)