-- Atualiza tracking_url dos parceiros confirmados (projeto "Viagens aéreas")
-- Execute no Supabase Studio → SQL Editor

update partners
set tracking_url = case slug
  when 'klook' then 'https://klook.tpm.li/HojGqit6'
  when 'yesim' then 'https://yesim.tpm.li/2WVTOLmm'
  when 'kiwitaxi' then 'https://kiwitaxi.tpm.li/JlHvJ60B'
  when 'localrent' then 'https://localrent.tpm.li/DPCDgdQh'
  when 'welcomepickups' then 'https://tpm.li/vP72Vz4f'
  when 'tiqets' then 'https://tiqets.tpm.li/BjU67GgE'
  when 'airalo' then 'https://airalo.tpm.li/tntRiQfV'
  when 'gettransfer' then 'https://gettransfer.tpm.li/wlqZYc6v'
  when 'drimsim' then 'https://drimsim.tpm.li/Qr3fQ5sf'
  when 'getrentacar' then 'https://getrentacar.tpm.li/17DuVtgs'
  when 'airhelp' then 'https://airhelp.tpm.li/sUPYJWBo'
  when 'gocity' then 'https://gocity.tpm.li/7SG1qYmO'
  when 'ektatraveling' then 'https://ektatraveling.tpm.li/FiNwLT5H'
  when 'economybookings' then 'https://economybookings.tpm.li/BfU3LmFX'
  when 'bikesbooking' then 'https://bikesbooking.tpm.li/TpooF6eU'
  when 'qeeq' then 'https://qeeq.tpm.li/73beZtYK'
  when 'wegotrip' then 'https://wegotrip.tpm.li/X84FbaYB'
  when 'autoeurope' then 'https://autoeurope.tpm.li/ujySlEO6'
  when 'radicalstorage' then 'https://radicalstorage.tpm.li/bc5DUh5f'
  when 'aviasales' then 'https://aviasales.tpm.li/uMbp7EUz'
  when 'intui' then 'https://intui.tpm.li/UPSbGQDX'
  when 'compensair' then 'https://compensair.tpm.li/3aSRyqXf'
  when 'saily' then 'https://saily.tpm.li/Ks3bwKHy'
  when 'kkday' then 'https://kkday.tpm.li/IuVKRDEL'
end
where slug in (
  'klook','yesim','kiwitaxi','localrent','welcomepickups','tiqets','airalo',
  'gettransfer','drimsim','getrentacar','airhelp','gocity','ektatraveling',
  'economybookings','bikesbooking','qeeq','wegotrip','autoeurope','radicalstorage',
  'aviasales','intui','compensair','saily','kkday'
);
