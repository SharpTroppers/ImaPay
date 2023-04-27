using ImaPay_BackEnd.Domain;
using ImaPay_BackEnd.Domain.Model;
using ImaPay_BackEnd.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ImaPay_BackEnd.Repositories;

public abstract class BaseRepository<T> : IRepository<T> where T : Entity
{

    protected readonly BankContext _bankContext;

    public BaseRepository(BankContext bankContext)
    {
        _bankContext = bankContext;
    }

    public async Task<IEnumerable<T>> GetAll()
    {
        return await _bankContext.Set<T>().ToListAsync();
    }

    public async  Task<T> GetById(int id)
    {
        return await _bankContext.Set<T>().FindAsync(id);
    }

    public async Task Add(T entity)
    {
        await _bankContext.Set<T>().AddAsync(entity);
        await _bankContext.SaveChangesAsync();
    }

    public async Task Update(T entity)
    {
       _bankContext.Set<T>().Update(entity);
        await _bankContext.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var entity = await GetById(id);
        _bankContext.Set<T>().Remove(entity);
        await _bankContext.SaveChangesAsync();
    }
}

