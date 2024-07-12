set :x, 0
live_loop :live do
  b = get[:x]
  print b
  play chord(:F3, :M7), pan: b
  sleep 1
end

live_loop :receive do
  a = sync "/osc*/pan/"
  print a
  set :x, a
  sleep 1
end