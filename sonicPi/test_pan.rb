set :x, 0
set :y, 1
live_loop :live do
  b = get[:x]
  print b
  play chord(:F3, :M7), pan: b, amp: get[:y]
  if get[:y]>0.3
    set :y, get[:y]-0.3
  else
    set :y, 0
  end
  sleep 1
end

live_loop :receive do
  a,b = sync "/osc*/object/laptop"
  print a
  set :x, a
  set :y, 1
  sleep 0.25
end